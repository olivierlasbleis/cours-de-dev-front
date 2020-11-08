import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-message-final',
  templateUrl: './message-final.component.html',
  styleUrls: ['./message-final.component.css']
})
export class MessageFinalComponent implements OnInit {

  @Input() message : string;
  @Input() header : string;
  @Input() footer : string;
  
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  ok(){
    this.activeModal.close();
  }

}
