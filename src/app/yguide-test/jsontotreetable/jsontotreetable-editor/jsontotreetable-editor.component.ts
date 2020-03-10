import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { NzCodeEditorService } from 'ng-zorro-antd/code-editor';

@Component({
  selector: 'app-jsontotreetable-editor',
  templateUrl: './jsontotreetable-editor.component.html',
  styleUrls: ['./jsontotreetable-editor.component.less']
})
export class JsontotreetableEditorComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService,private nzCodeEditorService: NzCodeEditorService) { }

  ngOnInit() {
    this.pubsub.sub("jsontotreetable.editordata",data=>{
      this.logging.debug("=== jsontotreetable.editordata="+JSON.stringify(data));
      this.json_text = JSON.stringify(data,null,2);
    });
  }

  json_text = "{}";

  dark = false;
  changeTheme()
  {
    if(this.dark==true) this.dark=false; else this.dark=true;
    this.nzCodeEditorService.updateDefaultOption({ theme: this.dark ? 'vs-dark' : 'vs' });
  }

  ///////////////////////////////////////////// test
  test_data()
  {
    let data = [{a:"a1",b:"b1"},{a:"a1",b:"b1"}];
    this.pubsub.pub("jsontotreetable.editordata",data);
  }


}