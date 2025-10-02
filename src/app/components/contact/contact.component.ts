import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  statusMessage: string | null = null;
  statusType: 'success' | 'error' | null = null;
  isSending: boolean = false;

  sendEmail(form: NgForm) {
    if (!form.valid) {
      this.statusMessage = 'Пожалуйста, исправьте ошибки в форме.';
      this.statusType = 'error';
      return;
    }

    this.isSending = true;

    emailjs.send(
      'service_u7ckplf',
      'template_uzlj6ve',
      this.formData,
      'xYeiKOCfD51jS0YOT'
    ).then((result: EmailJSResponseStatus) => {
      this.statusMessage = 'Сообщение успешно отправлено!';
      this.statusType = 'success';
      this.formData = { name: '', email: '', message: '' };

      this.isSending = false;
      form.resetForm();

      setTimeout(() => {
        this.statusMessage = null;
        this.statusType = null;
      }, 4000);

    }, (error) => {
      this.statusMessage = 'Что-то пошло не так. Пожалуйста, попробуйте ещё раз.';
      this.statusType = 'error';
      this.isSending = false;

      setTimeout(() => {
        this.statusMessage = null;
        this.statusType = null;
      }, 4000);
    });
  }
}
