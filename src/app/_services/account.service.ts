import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { User } from '../_models/user'
import { firstValueFrom } from 'rxjs'
import { pareUserPhoto } from '../_helper/helper'
import { Photo } from '../_models/photo'

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _key = 'account';
  private _baseApiurl = environment.baseUrl + 'api/account/';
  private _http = inject(HttpClient);

  data = signal<{ user: User; token: string } | null>(null);

  constructor() {
    this.loadDataFromLocalStorage()
  }

  //#region login_and_register
  logout() {
    localStorage.removeItem(this._key)
    this.data.set(null)
  }

  async login(loginData: { username: string; password: string }): Promise<string> {
    try {
      const url = `${this._baseApiurl}login`
      const response = this._http.post<{ user: User; token: string }>(url, loginData)
      const data = await firstValueFrom(response)
      data.user = pareUserPhoto(data.user)
      this.data.set(data)
      this.saveDataToLocalStorage()
      return ''
    } catch (error: any) {
      console.error('Login error:', error)
      return error.error?.message || 'Login failed'
    }
  }

  async register(registerData: User): Promise<string> {
    try {
      const url = `${this._baseApiurl}register`
      const response = this._http.post<{ user: User; token: string }>(url, registerData)
      const data = await firstValueFrom(response)
      data.user = pareUserPhoto(data.user)
      this.data.set(data)
      this.saveDataToLocalStorage()
      return ''
    } catch (error: any) {
      console.error('Register error:', error)
      return error.error?.message || 'Registration failed'
    }
  }
  //#endregion

  //#region localStorage
  private saveDataToLocalStorage() {
    localStorage.setItem(this._key, JSON.stringify(this.data()))
  }

  private loadDataFromLocalStorage() {
    const jsonString = localStorage.getItem(this._key)
    if (jsonString) {
      this.data.set(JSON.parse(jsonString))
    }
  }
  //#endregion

  //#region profile
  async updateProfile(user: User): Promise<boolean> {
    try {
      const url = `${environment.baseUrl}api/user/`
      const response = this._http.patch(url, user)
      await firstValueFrom(response)

      const currentUserData = this.data()
      if (currentUserData) {
        currentUserData.user = user
        this.data.set(currentUserData)
        this.saveDataToLocalStorage()
      }
      return true
    } catch (error) {
      console.error('Update profile error:', error)
      return false
    }
  }

  async setAvatar(photoId: string): Promise<void> {
    try {
      const url = `${environment.baseUrl}api/photo/${photoId}`
      await firstValueFrom(this._http.patch(url, {}))

      const user = this.data()?.user
      if (user) {
        user.photos = user.photos?.filter(p => p._id === photoId) || []
        const copyData = this.data()
        if (copyData) {
          copyData.user = user
          this.data.set(copyData)
          this.saveDataToLocalStorage()
        }
      }
    } catch (error) {
      console.error('Set avatar error:', error)
    }
  }

  async deletePhoto(photoId: string): Promise<void> {
    try {
      const url = `${environment.baseUrl}api/photo/${photoId}`
      await firstValueFrom(this._http.delete(url))

      const user = this.data()?.user
      if (user) {
        user.photos = user.photos?.filter(p => p._id !== photoId) || []
        const copyData = this.data()
        if (copyData) {
          copyData.user = user
          this.data.set(copyData)
          this.saveDataToLocalStorage()
        }
      }
    } catch (error) {
      console.error('Delete photo error:', error)
    }
  }

  async uploadPhoto(file: File): Promise<boolean> {
    try {
      const url = `${environment.baseUrl}api/photo/`
      const formData = new FormData()
      formData.append('file', file)

      const response = this._http.post<Photo>(url, formData)
      const photo = await firstValueFrom(response)

      const user = this.data()?.user
      if (user) {
        user.photos = user.photos ? [...user.photos, photo] : [photo]
        const copyData = this.data()
        if (copyData) {
          copyData.user = user
          this.data.set(copyData)
          this.saveDataToLocalStorage()
        }
        return true
      }
    } catch (error) {
      console.error('Upload photo error:', error)
    }
    return false
  }
  //#endregion
}
