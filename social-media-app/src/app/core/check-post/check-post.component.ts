import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-check-post',
  templateUrl: './check-post.component.html',
  styleUrls: ['./check-post.component.scss']
})
export class CheckPostComponent implements OnInit {
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  posts: any[] = [];
  constructor(
    private coreService: CoreService
  ) { }

  ngOnInit() {
    this.coreService
    .filter(this.searchInput.nativeElement)
    .subscribe(post => (this.posts = this.posts.concat(post)));
  }

}
