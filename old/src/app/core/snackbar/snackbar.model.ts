
export class SnackbarMessage {
  message: string;
  avatar: string;
  author: string;
  abonent: any;
  id: string;
  timeout: number;

  constructor(server_data: any, socket_data: any){
    this.setLastMessage(socket_data);
    this.avatar = server_data.main_photo;
    this.author = server_data.username;
    this.id = socket_data.id;
  }
  setLastMessage(socket_data: any){
    console.log('setting current message')
    // TODO глупо гнать всю комнату
    const key = Object.keys(socket_data.messages)[Object.keys(socket_data.messages).length-1];
    const lm = socket_data.messages[key];
    console.log(lm);
    this.message = lm.message;
  }
}
