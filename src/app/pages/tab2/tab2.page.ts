import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { RespuestaToHeadLines, Article } from '../../interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit {

  categorias: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  @ViewChild(IonSegment, {static: false}) segment: IonSegment;

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.showArticles(this.categorias[0]);
  }

  ngAfterViewInit() {
    this.segment.value = this.categorias[0];
    this.showArticles(this.categorias[0]);
  }

  showArticles(category: string) {
    this.noticias = [];
    this.noticiasService.getTopHeadLinesCategory(category).subscribe( resp => {
      console.log(resp);
      this.noticias.push( ...resp.articles );
    });
  }

  cambiaCategoria(event) {
    console.log(event.detail.value);
    this.showArticles(event.detail.value);
  }
}
