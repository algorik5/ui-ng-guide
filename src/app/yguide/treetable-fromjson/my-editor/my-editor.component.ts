import { Component, OnInit } from '@angular/core';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';
import { NzCodeEditorService } from 'ng-zorro-antd/code-editor';

@Component({
  selector: 'app-my-editor',
  templateUrl: './my-editor.component.html',
  styleUrls: ['./my-editor.component.less']
})
export class MyEditorComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService,private nzCodeEditorService: NzCodeEditorService) { }

  ngOnInit() {
    this.pubsub.sub("treetable-fromjson.editordata",data=>{
      this.logging.debug("=== treetable-fromjson.editordata="+JSON.stringify(data));
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
    this.pubsub.pub("treetable-fromjson.editordata",data);
  }

}
