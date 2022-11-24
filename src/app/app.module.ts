import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
    HttpClientModule,
    HTTP_INTERCEPTORS,
    HttpClient,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CvListComponent } from './components/cv-list/cv-list.component';
import { CvItemComponent } from './components/cv-item/cv-item.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import {
    FacebookLoginProvider,
    GoogleLoginProvider,
    SocialAuthServiceConfig,
    SocialLoginModule,
} from 'angularx-social-login';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { JwtInterceptor } from './shared/interceptor/jwt.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ErrorInterceptor } from './shared/interceptor/error.interceptor';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { JobDescriptionItemComponent } from './components/job-description-item/job-description-item.component';
import { JobDescriptionDetailComponent } from './components/job-description-detail/job-description-detail.component';
import { JobDescriptionCarouselComponent } from './components/job-description-carousel/job-description-carousel.component';
import { JobDescriptionListComponent } from './components/job-description-list/job-description-list.component';
import { CvCarouselComponent } from './components/cv-carousel/cv-carousel.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { AdminJobListComponent } from './components/admin-job-list/admin-job-list.component';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { AdminUserDetailComponent } from './components/admin-user-detail/admin-user-detail.component';
import { HistoryAppliedComponent } from './components/history-applied/history-applied.component';
import { AdminJdDetailComponent } from './components/admin-jd-detail/admin-jd-detail.component';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { environment } from 'src/environments/environment';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToolbarModule } from 'primeng/toolbar';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { SliderModule } from 'primeng/slider';
import { FiltersAdmin } from './shared/pipes/filters-admin';
import { UserCvListComponent } from './components/user-cv-list/user-cv-list.component';
import { UserCvItemComponent } from './components/user-cv-item/user-cv-item.component';
import { UpdateProfileUserComponent } from './components/update-profile-user/update-profile-user.component';
import { ContenteditableDirective } from './shared/directives/contenteditable.directive';
import { ImageCropperModule } from 'ngx-image-cropper';
import { EditorComponent } from './components/cv-templates/editor/editor.component';
import { SampleTemplateComponent } from './components/cv-templates/sample-template/sample-template.component';
import { TemplatePlaceholderComponent } from './components/cv-templates/template-placeholder/template-placeholder.component';
import { ClonedTemplateComponent } from './components/cv-templates/cloned-template/cloned-template.component';
import { CvTemplate15Component } from './components/cv-templates/cv-template15/cv-template15.component';
import { CreateTemplateHolderComponent } from './components/cv-templates/create-template-holder/create-template-holder.component';
import { CvTemplate43Component } from './components/cv-templates/cv-template43/cv-template43.component';
import { CvTemplate18Component } from './components/cv-templates/cv-template18/cv-template18.component';
import { CvTemplate20Component } from './components/cv-templates/cv-template20/cv-template20.component';
import { CvTemplate21Component } from './components/cv-templates/cv-template21/cv-template21.component';
import { CvTemplate31Component } from './components/cv-templates/cv-template31/cv-template31.component';
import { CvTemplate33Component } from './components/cv-templates/cv-template33/cv-template33.component';
import { CvTemplate22Component } from './components/cv-templates/cv-template22/cv-template22.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

export function httpTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '/assets/translations/', '.json');
}

const authConfigs = {
    autoLogin: true,
    providers: [
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleProviderId),
        },
        {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.facebookProviderId),
        },
    ],
};

@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        CvListComponent,
        CvItemComponent,
        LoginFormComponent,
        RegisterFormComponent,
        HeaderComponent,
        FooterComponent,
        JobDescriptionItemComponent,
        JobDescriptionDetailComponent,
        JobDescriptionCarouselComponent,
        JobDescriptionListComponent,
        CvCarouselComponent,
        AdminComponent,
        AdminHeaderComponent,
        AdminSidebarComponent,
        AdminUserListComponent,
        AdminJobListComponent,
        AdminMainComponent,
        AdminUserDetailComponent,
        HistoryAppliedComponent,
        AdminJdDetailComponent,
        FiltersAdmin,
        UserCvListComponent,
        UserCvItemComponent,
        UpdateProfileUserComponent,
        ContenteditableDirective,
        EditorComponent,
        SampleTemplateComponent,
        TemplatePlaceholderComponent,
        ClonedTemplateComponent,
        CvTemplate15Component,
        CreateTemplateHolderComponent,
        CvTemplate43Component,
        CvTemplate18Component,
        CvTemplate20Component,
        CvTemplate21Component,
        CvTemplate31Component,
        CvTemplate33Component,
        CvTemplate22Component,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SocialLoginModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        CarouselModule,
        FormsModule,
        PaginatorModule,
        InputTextModule,
        ButtonModule,
        MultiSelectModule,
        DropdownModule,
        TableModule,
        CalendarModule,
        DataViewModule,
        PanelModule,
        DialogModule,
        RatingModule,
        ToolbarModule,
        DynamicDialogModule,
        RippleModule,
        TooltipModule,
        ToastModule,
        ProgressSpinnerModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularEditorModule,
        CalendarModule,
        ImageCropperModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoader,
                deps: [HttpClient],
            },
        }),
        SliderModule,
    ],
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: authConfigs as SocialAuthServiceConfig,
        },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
