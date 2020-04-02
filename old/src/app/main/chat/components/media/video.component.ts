import { Component, Input } from '@angular/core';
import { StreamManager } from 'openvidu-browser';

@Component({
    selector: 'app-user-video',
    styles: [`
        ov-video {
            width: 100%;
            height: auto;
            float: left;
            cursor: pointer;
        }
        .stream {
            position: relative;
            height: 100%;
            top: -25px;
        }
        div div {
            position: absolute;
            padding-left: 5px;
            padding-right: 5px;
            color: #777777;
            font-weight: bold;
            border-bottom-right-radius: 4px;
            height: 100%;
        }
        p {
            margin: 0;
        }`],
    template: `
        <div class="stream">
            <app-ov-video [streamManager]="streamManager"></app-ov-video>
            <!--<div><p>{{getNicknameTag()}}</p></div>-->
        </div>`
})
export class UserVideoComponent {

    @Input()
    streamManager: StreamManager;

    getNicknameTag() { // Gets the nickName of the user
        return JSON.parse(this.streamManager.stream.connection.data).clientData;
    }
}
