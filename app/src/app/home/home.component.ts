import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name="year";
  sd='1';
  sm='1';
  sy='2022';
  ed='1';
  em='1';
  ey='2025';
  csvData: any[] = [];
  selectedFile!: File;



  constructor(
    private http:HttpClient
  ){

  }
  ngOnInit(): void {

  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    formData.append('sd', this.sd);
    formData.append('sm', this.sm);
    formData.append('sy', this.sy);
    formData.append('ed', this.ed);
    formData.append('em', this.em);
    formData.append('ey', this.ey);
    formData.append('name', this.name);
    alert(this.name);
    alert("Predict for \n"+
      this.sd+'/'+this.sm+'/'+this.sy+ '-'+this.ed+'/'+this.em+'/'+this.ey )
    this.http.post('http://localhost:5000/upload', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }






}













