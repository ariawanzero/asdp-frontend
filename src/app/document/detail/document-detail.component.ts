import { Component, OnInit } from '@angular/core';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { CommonResponseStatus } from '../../shared/class/common-response-status';
import { Task } from '../../shared/enum/task.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { GlobalMessageService } from '../../shared/service/global-message.service';
import { ConfirmationDialogService } from '../../shared/service/confirmation-dialog.service';
import { Document } from '../document';
import { ModalService } from '../../shared/service/modal.service';
import { LocalStorageService } from '../../shared/service/local-storage.service';
import { ConfirmationMessage } from '../../shared/class/confirmation-message';
import { TitleModal } from '../../shared/class/title-modal';

@Component({
  selector: 'asdp-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  response: CommonResponseStatus;

  task: Task = Task.None;
  document: Document;
  documentId: string;
  urlFile: string;
  role: string;

  constructor(
    private route: ActivatedRoute,
    private documentServ: DocumentService,    
    private globalMsgServ: GlobalMessageService,
    private confirmServ: ConfirmationDialogService,
    private modalServ: ModalService,
    private localStorageServ: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getIdFromParameter();
    this.getDocument();
    this.role = this.localStorageServ.getValue('client-role-name');
  }

  private getIdFromParameter(): void {
    this.route.params.subscribe(
      params => { 
        this.documentId = params['id'];
        this.getDocument();
      }, err => { 
        this.globalMsgServ.changeMessage(err);
      }
    );
  }

  private getDocument(): void {
    this.blockUI.start();
    this.documentServ.getReadDetailDocument({ id: this.documentId }).subscribe(
      resp => {
        this.document = resp;
      }, err => {
        this.blockUI.stop();
        this.globalMsgServ.changeMessage(err);
      }, () => {
        this.blockUI.stop();
        this.remaping();
      }
    )
  }

  onPreview(url: string): void {
    this.urlFile = url;
    console.log(url);
    this.modalServ.openModal("modal-file");
  }

  private remaping(): void {
    if(this.document) {
      this.document.divisiDisplay = JSON.parse(this.document.divisi);
    }
  }

  onApproved(): void {
    this.confirmServ.activate(ConfirmationMessage.APPROVE, TitleModal.CONFIRM).then(
      result => {
        if (result) {
          this.documentServ.approveDocument(this.document).subscribe(
          resp => {
            this.response = resp;
          },(err) => {
            this.blockUI.stop();
            this.globalMsgServ.changeMessage(err);
          }, () => {
            this.blockUI.stop(); 
            this.router.navigate(['../../' ], { relativeTo: this.route });
          }
          )
        }
      }
    )
  }

  onRejected(): void {
    this.confirmServ.activate(ConfirmationMessage.REJECT, TitleModal.CONFIRM).then(
      result => {
        if (result) {
          this.documentServ.rejectedDocument(this.document).subscribe(
          resp => {
            this.response = resp;
          },(err) => {
            this.blockUI.stop();
            this.globalMsgServ.changeMessage(err);
          }, () => {
            this.blockUI.stop(); 
            this.router.navigate(['../../' ], { relativeTo: this.route });
          }
          )
        }
      }
    )
  }

}
