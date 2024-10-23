import {Component} from '@angular/core';
import {Member, MemberService} from "./member.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.css']
})
export class MemberRegistrationComponent {
  title = 'kitchensink-frontend';
  memberForm: FormGroup;

  member: Member = {
    id: '',
    name: '',
    email: '',
    phoneNumber: ''
  };
  members: Member[] = [];

  errorMessage: string | null = null;

  constructor(private memberService: MemberService, private router: Router, private fb: FormBuilder) {

    this.loadMembers();
    this.memberForm = this.fb.group({
      id: [''],
      name: ['', {validators: [Validators.required], updateOn: 'blur'}],
      email: ['', {validators: [Validators.required, Validators.email], updateOn: 'blur'}],
      phoneNumber: ['', {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(12),Validators.pattern("^[0-9]*$")],
        updateOn: 'blur'
      }]
    });
    this.memberForm.reset(); // Reset the form after successful registration

  }

  loadMembers(): void {
    this.memberService.getMembers().subscribe({
      next: (data) => {
        this.members = data;
      },
      error: (error) => {
        this.errorMessage = 'An error occurred while fetching members';
      }
    });
  }

  onSubmit() {
    this.member = this.memberForm.value;
    this.memberService.registerMember(this.member).subscribe({
      next: () => {
        this.errorMessage = null;
        this.loadMembers(); // Reload members after successful registration
        this.memberForm.reset(); // Reset the form after successful registration
      },
      error: (error) => {
        if (error.status === 400) {
          this.bindErrors(error.error);
        } else if (error.status === 409) {
          this.errorMessage = 'Email is already taken';
        } else {
          this.errorMessage = 'An unexpected error occurred';
        }
      }
    });
  }

  bindErrors(errors: any): void {
    for (const key in errors) {
      console.info(key);
      console.info(errors[key]);
      console.info(this.memberForm.controls[key]);
      if (errors.hasOwnProperty(key) && this.memberForm.controls[key]) {
        this.memberForm.controls[key].setErrors({[key]:errors[key]});
      }
    }
  }

  openNewTab(url: string): void {
    window.open(url, '_blank');
  }

  getMemberById(id: string): string {

    return `${environment.baseURL}/${id}`;

  }

  getMembers(): string {

    return `${environment.baseURL}`;

  }
}
