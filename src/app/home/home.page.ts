import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from "../models/message.model";
import { OpenaiService } from '../services/openai.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  messages: Message[] = [
    { sender: 'me', content: 'Hola como estas?' },
    { sender: 'bot', content: 'Bien y vos?' }
  ];

  form = new FormGroup({
    promt: new FormControl('')
  })

  loading: boolean = false;

  constructor(private openAi: OpenaiService) { }

  submit() {
    console.log(this.form.value)

    let promt = this.form.value.promt as string;

    let userMsg: Message = { sender: 'me', content: promt }
    this.messages.push(userMsg)

    let botMsg: Message = { sender: 'bot', content: '' }
    this.messages.push(botMsg)

    this.form.reset();
    this.form.disable();

    this.loading = true

    this.openAi.sendQuestion(promt).subscribe({
      next: (res: any) => {
        console.log(res)
      },error: (error:any)=>{
        console.log(error)
      }
    })

    // setTimeout(() => {
    //   this.typeText('asjkndkajsndlkjasndlkjasnldkjanslkjdnalksjdnalkjsndlkajsndlkajnsdkljanskldjnaskjdn')
    //   this.form.enable();
    // }, 2000);

  }

  typeText(text: string) {
    let textIndex = 0;
    let messagesLastIndex = this.messages.length - 1;
    let interval = setInterval(() => {
      if (textIndex < text.length) {
        this.messages[messagesLastIndex].content += text.charAt(textIndex);
        textIndex++;
      } else {
        clearInterval(interval)
      }
    }, 15)
  }

}
