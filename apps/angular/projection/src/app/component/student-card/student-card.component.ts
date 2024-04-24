import { Component, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { ListItemTemplateDirective } from '../../directive/list-item-template-directive';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardImageTemplateDirective } from '../../ui/card/card-image-template.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students" [type]="cardType" customClass="bg-light-green">
      <ng-template cardImageTemplate>
        <img src="assets/img/student.webp" width="200px" />
      </ng-template>

      <ng-template listItemTemplate let-item>
        <app-list-item
          [id]="item.id"
          [name]="getStudentName(item)"
          (deleteItem)="onDeleteItem($event)"></app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [
    CardComponent,
    CardImageTemplateDirective,
    ListItemComponent,
    ListItemTemplateDirective,
  ],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit() {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  onDeleteItem(id: number) {
    this.store.deleteOne(id);
  }

  getStudentName({ firstName, lastName }: Student): string {
    return `${firstName} ${lastName}`;
  }
}
