import { Component, inject, OnInit, WritableSignal } from '@angular/core'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { MemberService } from '../_services/member.service'

import { User } from '../_models/user'
import { MatExpansionModule } from '@angular/material/expansion'
import { Paginator, UserQueryPagination, default_pageSizeOption, default_paginator } from '../_models/Pagination'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MemberCardComponent } from './member-card/member-card.component'


@Component({
  selector: 'app-member',
  imports: [MatPaginatorModule, MatExpansionModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule, MatIconModule, MemberCardComponent],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent implements OnInit {
  private memberservice = inject(MemberService)
  paginator: WritableSignal<Paginator<UserQueryPagination, User>>
  pageSize = default_pageSizeOption
  constructor() {
    this.paginator = this.memberservice.paginator
  }
  ngOnInit(): void {
    this.memberservice.getMembers()
  }
  onPageChnage(event: PageEvent) {
    const copypaginator = this.paginator()
    copypaginator.pagination.currentPage = event.pageIndex + 1
    copypaginator.pagination.pageSize = event.pageSize
    this.paginator.set(copypaginator)
    this.onSearch()

  }

  onSearch() {
    this.memberservice.getMembers()
  }

  onResetSearch() {
    this.paginator.set(default_paginator)
    this.onSearch()
  }
}