import { HistoryAppliedComponent } from './components/history-applied/history-applied.component';
import { AdminUserDetailComponent } from './components/admin-user-detail/admin-user-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { JobDescriptionDetailComponent } from './components/job-description-detail/job-description-detail.component';
import { JobDescriptionListComponent } from './components/job-description-list/job-description-list.component';
import { CvListComponent } from './components/cv-list/cv-list.component';
import { RoleGuardService } from './shared/guards/role.guard';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { AdminJobListComponent } from './components/admin-job-list/admin-job-list.component';
import { AdminJdDetailComponent } from './components/admin-jd-detail/admin-jd-detail.component';
import { UserCvListComponent } from './components/user-cv-list/user-cv-list.component';
import { UpdateProfileUserComponent } from './components/update-profile-user/update-profile-user.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { TemplatePlaceholderComponent } from './components/cv-templates/template-placeholder/template-placeholder.component';
import { CreateTemplateHolderComponent } from './components/cv-templates/create-template-holder/create-template-holder.component';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomepageComponent },
    {
        path: 'jobs',
        children: [
            { path: '', component: JobDescriptionListComponent},
            { path: 'detail/:id', component: JobDescriptionDetailComponent },
        ],
    },
    { path: 'user', canActivate: [AuthGuard] ,
      children: [
        { path: '', component: UpdateProfileUserComponent},
        { path: 'history-applied', component: HistoryAppliedComponent},
        { path: 'create-cv/:model', component: CreateTemplateHolderComponent },
        { path: 'update-cv/:id', component: TemplatePlaceholderComponent }
      ]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuardService],
        children: [
            { path: '', component: AdminMainComponent },
            { path: 'users',
            children: [
              { path: '', component: AdminUserListComponent },
              { path: 'detail/:id', component: AdminUserDetailComponent }
            ]
           },
            {
                path: 'jobs',
                children: [
                    { path: '', component: AdminJobListComponent },
                    { path: 'detail/:id', component: AdminJdDetailComponent },
                    { path: 'create', component: AdminJdDetailComponent },
                ],
            },
            { path: 'user/:id', component: AdminUserDetailComponent },
        ],
    },
    { path: 'cv-list', component: CvListComponent },
    { path: 'user-cv-list', component: UserCvListComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'register', component: RegisterFormComponent },
    { path: 'cv-sample', component: TemplatePlaceholderComponent },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
