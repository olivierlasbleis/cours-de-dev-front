import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { RouterModule } from '@angular/router';
import { 
	IgxCalendarModule,
	IgxDialogModule,
    IgxIconModule
 } from "igniteui-angular";
 import { HammerModule } from "@angular/platform-browser";
import { ComponentsComponent } from './components.component';
import { MonAnnonceComponent } from './mon-annonce/mon-annonce.component';
import { HautPageComponent } from './haut-page/haut-page.component';
import { RealisationsComponent } from './realisations/realisations.component';
import { FooterComponent } from './footer/footer.component';
import { CalendarComponent } from './calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { NgxStripeModule } from 'ngx-stripe'
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { PaymentComponent } from './calendar/payment/payment.component';
import { ToastrModule } from 'ngx-toastr';
import { FormulaireCoursComponent } from './calendar/formulaire-cours/formulaire-cours.component';
import { ConfirmationPaiementComponent } from './calendar/confirmation-paiement/confirmation-paiement.component';
import { MessageFinalComponent } from './calendar/message-final/message-final.component';
import { RecapitulatifCommandeComponent } from './calendar/recapitulatif-commande/recapitulatif-commande.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module,
        IgxCalendarModule,
        HammerModule,
        BrowserAnimationsModule,
        IgxDialogModule,IgxIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatButtonToggleModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        ToastrModule.forRoot(),
        NgxStripeModule.forRoot('pk_test_51HiGZdJbzYV33WGmUnah8PQME6cv8tIWR5p3JcIfZuNB4AZV6hlCsAL3JXPKNuhpAUgKLkkeeUw5PzRx1jgjaQxE00X08qIiTK')
      ],
    declarations: [
        ComponentsComponent,
        MonAnnonceComponent,
        HautPageComponent,
        RealisationsComponent,
        FooterComponent,
        CalendarComponent,
        PaymentComponent,
        FormulaireCoursComponent,
        ConfirmationPaiementComponent,
        MessageFinalComponent,
        RecapitulatifCommandeComponent
    ],
    exports:[ ComponentsComponent,MatFormFieldModule,MatInputModule,
      MatDialogModule,MatButtonModule 
      ]
})
export class ComponentsModule { }
