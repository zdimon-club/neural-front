import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  @Input() user;
  @Input() current_user;

  @Output() OnEditPage = new EventEmitter();

  constructor() { }

  ngOnInit() {

  }

  public onEdit(): void {
      this.OnEditPage.emit('edit');
  }


}
