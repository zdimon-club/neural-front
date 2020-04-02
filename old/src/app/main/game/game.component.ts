import { UserlistService } from './../userlist/userlist.service';
import { SoundService } from './../../core/services/sound.service';

import { RegistrationService } from '../registration/registration.service';
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { range, pipe, Observable, interval, fromEvent, combineLatest, of } from 'rxjs';
import { map, flatMap, toArray, mergeMap, tap, filter, scan, sample  } from 'rxjs/operators';

// store
import { Store } from '@ngrx/store';
import { SessionState } from '../../auth/store/session.store';
import { selectIsAuth, selectUser, selectOnline } from '../../auth/store/session.selector';

import { ChatService } from '../chat/services/chat.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {

  @ViewChild('gameCanvas',{static: false}) gameCanvas: ElementRef;

  SPEED = 30;
  STAR_NUMBER = 250;
  ENEMY_FREQ = 1500;
  StarStream$: Observable<any>;
  MouseStream$: Observable<any>;
  ShootingStream$: Observable<any>;
  EnemyStream$: Observable<any>;
  user: any;
  user_image: any;
  dick_image: any;
  users: any;


  constructor(
    private sessionStore: Store<SessionState>,
    private sound_service: SoundService,
    private user_list_service: UserlistService,
    private chat_service: ChatService,
    private router: Router,
    ) {


    this.user_list_service.getList().subscribe((res: any) => {
      this.users = res.results_list;
      // console.log(this.users);
    })

    this.dick_image = new Image(50, 50);
    // this.dick_image.src = '/assets/img/dick.png';
    this.dick_image.src = '/assets/images/game/airplane.png';

    this.sessionStore
      .select(selectUser)
      .subscribe((data) => {
        this.user = data;
        this.user_image = new Image(50, 50);   // Размер изображения
        // image.onload = drawImageActualSize; // Рисуем изображение, когда оно будет загружено
        
        // load an image of intrinsic size 300x227 in CSS pixels
        this.user_image.src = this.user.main_photo;
      });

  }

  ngAfterViewInit() {

    this.gameCanvas.nativeElement.width = window.innerWidth;
    this.gameCanvas.nativeElement.height = window.innerHeight;
    
    this.StarStream$ = range(1, this.STAR_NUMBER)
    .pipe(
      map(() => {
       return {
          x: parseInt((Math.random() * this.gameCanvas.nativeElement.width).toString()),
          y: parseInt((Math.random() * this.gameCanvas.nativeElement.height).toString()),
          size: parseInt((Math.random() * 3 + 1).toString())
       };
      }),
      toArray(),
      mergeMap((data) => {
        return interval(this.SPEED)
        .pipe(
          // tap((v) => console.log(data)),
          map(() => {
            data.forEach((star) => {
              if (star.y >= this.gameCanvas.nativeElement.height) {
                star.y = 0; // Reset star to top of the screen
                }
                star.y += 3; // Move star
            })
            return data;
          })
        )
      })
    );

    const HERO_Y = this.gameCanvas.nativeElement.height - 30;

    this.MouseStream$ = fromEvent(this.gameCanvas.nativeElement,'mousemove')
    .pipe(
      map((e: any) => {
        // console.log(e);
        return {
          x: e.clientX,
          y: e.clientY, 
        }
      })
    );

    this.ShootingStream$ = fromEvent(this.gameCanvas.nativeElement,'click')
    .pipe(
      tap((e) => {
        this.sound_service.playMessage();
      }),
      map((evt: any) => {
          return [{x: evt.clientX, y: evt.clientY}];
      }),
      scan((acc: any, cur: any) => {
          console.log(acc);
          console.log(cur);
          acc.push({x: cur[0].x, y: cur[0].y});
          return acc;

      },[])
    )
    ;

    this.EnemyStream$ = interval(this.ENEMY_FREQ)
    .pipe(
    scan((enArray: any) => {
      // if (enArray.length === 0) {
      const user = this.users[Math.floor(Math.random()*this.users.length)];
      const enemy = {
          x: parseInt((Math.random() * this.gameCanvas.nativeElement.width).toString()),
          y: -30,
          image: user.main_photo,
          user_id: user.id
        };
        enArray.push(enemy);
        return enArray;
      // }
    },[])

      // const enemy = {
      //     x: parseInt(Math.random() * this.gameCanvas.nativeElement.width),
      //     y: -30,
      //   };
      //   enArray.push(enemy);
      //   return enArray;
      //   },[])
    );

    const Game = combineLatest(
      this.StarStream$,
      this.MouseStream$,
      this.ShootingStream$,
      this.EnemyStream$,
      (stars, ship, shooting, enemies) => {
        return {
          stars,
          ship,
          shooting,
          enemies
        };
      }).pipe(
        sample(interval(this.SPEED))
      )
    

      Game.subscribe((v) => {
        this.renderScene(v);
        // console.log(v);
      })

    // this.MouseStream$.subscribe((v) => {
    //   console.log(v);
    // });

    // this.StarStream$.subscribe((v) => {
    //   this.paintStars(v);
    // });

  }


  paintStars(stars) {
    // console.log(stars);
    const ctx = this.gameCanvas.nativeElement.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height);
    ctx.fillStyle = '#ffffff';
    stars.forEach((star) => {
      ctx.fillRect(star.x, star.y, star.size, star.size);
    });
  }

  drawTriangle(x, y, width, color, direction) {
    const ctx = this.gameCanvas.nativeElement.getContext('2d');
    ctx.drawImage(this.user_image,x,y-30,50,50);
    }

    drawEnimy(x, y, width, color, direction, image) {
      const ctx = this.gameCanvas.nativeElement.getContext('2d');
      const user_image = new Image(50, 50);
      user_image.src = image;
      ctx.drawImage(user_image,x,y-30,50,50);
    }

    drawShot(x, y, width, color, direction) {
      const ctx = this.gameCanvas.nativeElement.getContext('2d');

      let yy = direction === 'up' ? y - width : y + width;
      ctx.drawImage(this.dick_image,x,yy,50,50);
      // ctx.fillStyle = color;
      // ctx.beginPath();
      // ctx.moveTo(x - width, y);
      // ctx.lineTo(x, direction === 'up' ? y - width : y + width);
      // ctx.lineTo(x + width, y);
      // ctx.lineTo(x - width,y);
      // ctx.fill();
      }

  paintSpaceShip(x, y) {
      this.drawTriangle(x, y, 20, '#ff0000', 'up');
  }

  paintShots(heroShots, enemies) {
    heroShots.forEach((shot) => {
       shot.y -= 5;
       this.drawShot(shot.x, shot.y, 5, '#ffff00', 'up');
       for (var l=0; l<enemies.length; l++) {
          const enemy = enemies[l];
          if (this.collision(shot, enemy)) {
            // console.log('dddddddddd');
            const data = {
              owner: this.user.id,
              abonent: enemy.user_id,
            };
            enemies.splice(l,1);
            // this.chat_service.addRoom(data).subscribe((res: any) => {
            //   this.router.navigate(['chat/room', res.id]);
            // });
          }
        }
      });
  }

  paintEnemies(enemies) {
    enemies.forEach((shot) => {
       shot.y += 5;
       this.drawEnimy(shot.x, shot.y, 5, '#ffff00', 'up',shot.image);
      });
  }

  renderScene(actors) {
    this.paintStars(actors.stars);
    this.paintSpaceShip(actors.ship.x, actors.ship.y);
    this.paintShots(actors.shooting, actors.enemies);
    this.paintEnemies(actors.enemies);
  }

  collision(target1, target2) {
    return (target1.x > target2.x - 40 && target1.x < target2.x + 40) &&
    (target1.y > target2.y - 40 && target1.y < target2.y + 40);
  }


}
