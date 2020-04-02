import { Component, OnInit } from '@angular/core';
import { Deck } from './Deck';
import { Card } from './Card';
import { CardComponent } from './card.component';
import { CardService } from './service';

import { SessionState } from '../../../auth/store/session.store';
import { Store } from '@ngrx/store';
import {AddAccount} from '../../../auth/store/session.action';

import {SoundService} from '../../../core/services/sound.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  current_deck: Deck;
  current_set: Array<Card>;
  cards_selected: Array<Card>;
  bet: number;
  is_active_game: boolean;
  account: number;
  isBetUpPossible: boolean;
  isBetDownPossible: boolean;
  win: number;
  mode: string;
  win_set: any;

  constructor(
    private session_store: Store<SessionState>
    ,private sound_service: SoundService
    ) {
    this.current_set = [];
    this.cards_selected = [];
    this.bet = 0;
    this.win = 0;
    this.is_active_game = false;
    this.account = 10;
    this.isBetUpPossible = true;
    this.isBetDownPossible = false;
    this.mode = 'roll';
    this.win_set = [];
  }

  ngOnInit() {}

  getCards(num: number) {
    this.current_set = this.current_deck.get(6);
    this.current_set.forEach((card) => {
      card.isHidden = false;
    });
  }

  shuffle() {
    this.current_deck.shuffle();
  }

  selectCard(card: Card) {
    if (this.mode === 'roll') {
      if (this._is_exist(this.cards_selected, card)) {
        this._delete(this.cards_selected, card);
      } else {
        this.cards_selected.push(card);
      }
    }

    if (this.mode === 'double') {
      console.log(card.rate + '-' + this.current_set[0].rate);
      if (card.rate > this.current_set[0].rate) {
        this.win *= 2;
        this.sound_service.playLaugh();
      } else if (card.rate === this.current_set[0].rate) {
      } else {
        this.win = 0;
        this.mode = 'roll';
        this.sound_service.playFart();
      }
    }
  }

  _delete(ar, card) {
    this.cards_selected.forEach((v) => {
      if (v.name === card.name && v.face === card.face) {
        this.cards_selected.splice(this.cards_selected.indexOf(v), 1);
      }
    });
  }

  _is_exist(ar, card) {
    let fl = false;
    this.cards_selected.forEach((v) => {
      if (v.name === card.name && v.face === card.face) {
        fl = true;
      }
    });
    return fl;
  }

  changeCards(card: Card) {
    this.cards_selected.forEach((v) => {
      this.current_set.forEach((vv) => {
        if (vv.name === v.name && vv.face === v.face) {
          let nc = this.current_deck.get(1);
          this.current_set[this.current_set.indexOf(vv)] = nc[0];
        }
      });
    });
    this.cards_selected = [];
    this.checkWin();
  }

  start(): void {
    this.mode = 'roll';
    this.is_active_game = true;
    this.isBetDownPossible = false;
    this.isBetUpPossible = false;
    this.cards_selected = [];
    this.current_deck = new Deck(52);
    this.current_deck.shuffle();
    this.current_set = this.current_deck.get(5);
    this.checkWin();
    this.account -= this.bet;
  }

  checkWin(): void {
    this.win_set = CardService.evaluate(this.current_set, this.bet);
    this.win = this.win_set['win'];
    if(this.win > 0) {
      this.sound_service.playLaugh();
    }
    this.highlightCards(this.win_set['active']);
  }

  highlightCards(cards: any[]) {
    // console.log(cards);
    cards.forEach((element) => {
      if ('two' in element) {
        this.current_set.forEach((e) => {
          if (e.name === element['two']) {
            e.isHighlighted = true;
          }
        });
      }

      if ('three' in element) {
        this.current_set.forEach((e) => {
          if (e.name === element['three']) {
            e.isHighlighted = true;
          }
        });
      }

      if ('four' in element) {
        this.current_set.forEach((e) => {
          if (e.name === element['four']) {
            e.isHighlighted = true;
          }
        });
      }

    });
  }

  isValidSelection(): boolean {
    if (this.cards_selected.length > 0) return true;
    return false;
  }

  canTake(): boolean {
    if (this.win > 0) return true;
    return false;
  }

  takeMoney(): void {
    // this.account += this.win;
    const data = {credits: this.win, plan_id: 1};
    this.session_store.dispatch(new AddAccount(data));
    this.win = 0;
    this.mode = 'roll'
  }

  isStartPossible(): boolean {
    if (this.bet > 0 && this.mode == 'roll') return true;
    return false;
  }

  betUp(): void {
    if (this.account > 0) {
      this.isBetDownPossible = true;
      this.bet += 1;
      if (this.account == 0) this.isBetUpPossible = false;
    } else {
      this.isBetUpPossible = false;
    }
  }

  betDown(): void {
    this.bet -= 1;
    if (this.bet > 0) {
      this.isBetDownPossible = true;
      this.isBetUpPossible = true;
    } else {
      this.isBetDownPossible = false;
    }
  }

  doubleMode(): void {
    this.mode = 'double';
    this.current_deck = new Deck(52);
    this.current_deck.shuffle();
    this.current_set = this.current_deck.get(5);
    this.current_set.forEach((c) => {
      if (this.current_set.indexOf(c) > 0) {
        c.isHidden = true;
      }
    });
  }

  canDouble(): boolean {
    if (this.win > 0) return true;
    return false;
  }
}
