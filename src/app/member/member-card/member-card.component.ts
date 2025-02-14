import { Component, inject, Input, OnInit } from '@angular/core'
import { User } from '../../_models/user'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { LikeService } from '../../_services/like.service'
import { cacheManager } from '../../_helper/cach'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent implements OnInit {

  likeService = inject(LikeService)
  @Input() member!: User
  isFollowing = false

  ngOnInit() {
    const member = this.member
    if (!this.member || !this.member.id) return
    this.isFollowing = this.likeService.IsFollowingMember(this.member.id)

  }

  toggleLike() {
    const member = this.member
    if (!this.member || !this.member.id) return
    const result = this.likeService.toggleLike(this.member.id)
    this.isFollowing = result !== undefined ? result : this.isFollowing
    cacheManager.clear('all')
  }
}