import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { RespuestaToHeadLines, Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.showArticles();
  }
  loadData(event) {
    console.log(event);
    this.showArticles(event);
  }

  showArticles( event? ) {
    this.noticiasService.getTopHeadLines().subscribe(data => {
      if ( data.articles.length === 0 ) {
        event.target.disabled = true;
        return;
      }
      this.noticias.push(...data.articles);
      if ( event ) {
        event.target.complete();
      }
    });
  }
}
