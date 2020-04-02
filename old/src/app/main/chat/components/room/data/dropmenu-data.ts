import { DropMenuType, DropMenu } from '../../../../../core/dropmenu/';

const p = '/assets/icons/svg-icons';
export const dropMenuData: DropMenu = {
  iconOn: `${p}/dropmenu-on.svg`,
  iconOff: `${p}/dropmenu-off.svg`,
  type: DropMenuType.dropUp,
  buttons: [
    {
      title: 'DROPMENU_BTN_GO_LIVE',
      iconOn: `${p}/dropmenu-go-live.svg`,
      iconOff: `${p}/dropmenu-go-live.svg`,
      action: 'navigate',
      arg: 'index',
    },
    {
      title: 'DROPMENU_BTN_ROLL',
      iconOn: `${p}/dropmenu-roll.svg`,
      iconOff: `${p}/dropmenu-roll.svg`,
      action: 'navigate',
      arg: 'index',
    },
    {
      title: 'DROPMENU_BTN_OFF_WEBCAM',
      iconOn: `${p}/dropmenu-off.svg`,
      iconOff: `${p}/dropmenu-off-webcam.svg`,
      action: 'navigate',
      arg: 'index',
    },
  ],
};
