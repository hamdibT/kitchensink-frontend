import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../environments/environment";

export interface Member {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private baseUrl = environment.baseURL;

  constructor(private http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl);
  }

  registerMember(member: Member): Observable<any> {
    return this.http.post(this.baseUrl, member);
  }

  getMemberById(id: string): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}/${id}`);
  }
}
