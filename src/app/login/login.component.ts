import { Component, signal } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { PasswordValidator } from '../_validator/password.validator'
import { PasswordMatchValidator } from '../_validator/password.match.validator'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { provideNativeDateAdapter } from '@angular/material/core'

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class LoginComponent {
  [x: string]: any
  mode: 'Login' | 'Register' = 'Login'
  form: FormGroup

  private readonly _currenYear = new Date().getFullYear()
  readonly minDate = new Date(this._currenYear - 70, 0, 1)
  readonly maxDate = new Date(this._currenYear - 18, 11, 31)
  readonly starDate = new Date(this._currenYear)

  errorMessages = {
    username: signal(''),
    password: signal(''),
    display_name: signal(''),
    confirm_password: signal('')
  }

  constructor() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      password: new FormControl(null, [Validators.required, PasswordValidator(8, 16)]),
    })
  }

  toggleMode() {
    this.mode = this.mode === 'Login' ? 'Register' : 'Login'
    this.updateForm()
  }
  updateForm() {
    if (this.mode === 'Register') {
      this.form.addControl('confirm_password', new FormControl(null, Validators.required))
      this.form.addValidators(PasswordMatchValidator('password', 'confirm_password'))
      this.form.addControl('display_name', new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]))
      this.form.addControl('date_of_birth', new FormControl(null, Validators.required))
      this.form.addControl('gender', new FormControl(null, Validators.required))
      this.form.addControl('looking_for', new FormControl(null, Validators.required))
    } else {
      this.form.removeControl('confirm_password')
      this.form.removeValidators(PasswordMatchValidator('password', 'confirm_password'))
      this.form.removeControl('display_name')
      this.form.removeControl('date_of_birth')
      this.form.removeControl('gender')
      this.form.removeControl('looking_for')
    }
  }
  onSubmit() {

  }

  updateErroeMessage(ctrlName: string) {
    const control = this.form.controls[ctrlName]
    if (!control) return

    switch (ctrlName) {
      case 'username':
        if (control.hasError('reqired'))
          this.errorMessages.username.set('required')

        else if (control.hasError('minlength'))
          this.errorMessages.username.set('must be at least 6 character long')
        else if (control.hasError('maxlength'))
          this.errorMessages.username.set('must be at least 16 character long')
        else this.errorMessages.username.set('')
        break
      case 'password':
        if (control.hasError('reqired'))
          this.errorMessages.password.set('required')
        else if (control.hasError('invalidMinLength'))
          this.errorMessages.password.set('must be at least 6 character long')
        else if (control.hasError('invalidMaxLength'))
          this.errorMessages.password.set('must be at least 16 character or few')
        else if (control.hasError('invalidLowerCase'))
          this.errorMessages.password.set('must contain minimum of 1 lower-case letter')
        else if (control.hasError('invalidUpperCase'))
          this.errorMessages.password.set('must contain minimum of 1 lower-case letter')
        else if (control.hasError('invalidNumeric'))
          this.errorMessages.password.set('must contain minimum of 1 lower-case letter')
        else if (control.hasError('invalidSpecialChar'))
          this.errorMessages.password.set('must contain minimum of 1 lower-case letter')
        else this.errorMessages.password.set('')
        break
      case 'confirm_password':
        if (control.hasError('reqired'))
          this.errorMessages.confirm_password.set('requied')
        else if (control.hasError('misMatch'))
          this.errorMessages.confirm_password.set('do not match password')
        else
          this.errorMessages.confirm_password.set('')
        break
      case 'display_name':
        if (control.hasError('reqired'))
          this.errorMessages.display_name.set('required')

        else if (control.hasError('minlength'))
          this.errorMessages.display_name.set('must be at least 6 character long')
        else if (control.hasError('maxlength'))
          this.errorMessages.display_name.set('must be at least 16 character long 😒')
        else this.errorMessages.display_name.set('')
        break
    }
  }
}

