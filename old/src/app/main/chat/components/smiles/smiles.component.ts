import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IEmojiItem, IStickers, RoomState } from '../../store/chat.store';
import { Store } from '@ngrx/store';
import { getEmojiList, getStickersList } from '../../store/chat.selector';
import { PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import * as roomActions from '../../store/chat.action';

enum TabName {
  Emoji = 'emoji',
  Stickers = 'stickers',
}

interface ITab {
  active: boolean;
  name: TabName;
  translate: string;
}

@Component({
  selector: 'app-smiles',
  templateUrl: './smiles.component.html',
  styleUrls: ['./smiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmilesComponent implements OnInit {

  public emoji$: Observable<Array<IEmojiItem>>;
  public stickers$: Observable<Array<IStickers>>;

  public tabs: ITab[] = [
    {
      name: TabName.Emoji,
      active: true,
      translate: 'Emoji',
    },
    {
      name: TabName.Stickers,
      active: false,
      translate: 'Stickers',
    },
  ];

  public perfectScrollbarConfig: PerfectScrollbarConfigInterface = {};

  @ViewChild(PerfectScrollbarDirective, {static: false})
  private ps: PerfectScrollbarDirective;

  @Output()
  private emoji: EventEmitter<string> = new EventEmitter();

  constructor(private roomStore: Store<RoomState>,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.emoji$ = this.roomStore.select(getEmojiList);
    this.stickers$ = this.roomStore.select(getStickersList);
  }

  public get activeTab(): ITab {
    return this.tabs.find(({ active }) => active);
  }

  public get smilesTypeActive(): TabName {
    return this.activeTab.name;
  }

  public changeTab(tab: ITab): void {
    this.tabs.forEach((item) => item.active = false);

    tab.active = true;
  }

  private uploadEmoji(): void {
    this.roomStore.dispatch(new roomActions.GetEmojiList());
  }

  private uploadStickers(): void {
    this.roomStore.dispatch(new roomActions.GetStickersList());
  }

  public uploadMore(): void {
    const currentTabName = this.activeTab.name;

    switch (currentTabName) {
      case TabName.Emoji:
        this.uploadEmoji();
        break;
      case TabName.Stickers:
        // this.uploadStickers();
        break;
    }
  }

  public emojiSelect(item: IEmojiItem): void {
    this.emoji.emit(item.alias);
  }
}
