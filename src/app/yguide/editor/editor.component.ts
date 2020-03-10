import { Component, OnInit } from '@angular/core';
import { NzCodeEditorService } from 'ng-zorro-antd/code-editor';
import { AapubsubService } from 'src/app/aservice/aapubsub.service';
import { AaloggingService } from 'src/app/aservice/aalogging.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent implements OnInit {

  constructor(private pubsub:AapubsubService,private logging:AaloggingService,private nzCodeEditorService: NzCodeEditorService) { }

  topicprefix = "myname.editor";//this.topicprefix+".datas"
  
  ngOnInit() {
    this.pubsub.sub(this.topicprefix+".datas",data=>{
      this.logging.debug("=== myname.editor="+JSON.stringify(data))
      this.json_text = JSON.stringify(data,null,2);
    });
  }

  json_text = "{}";
  typescript_text = "let i=0; \nconsole.log(i);"
  markdown_text = "# hi \n- hihi"

  dark = false;
  changeTheme()
  {
    if(this.dark==true) this.dark=false; else this.dark=true;
    this.nzCodeEditorService.updateDefaultOption({ theme: this.dark ? 'vs-dark' : 'vs' });
  }

  ///////////////////////////////////////////// test
  test_no = 0;
  test_data()
  {
    let data = [{a:"a1",b:"b1"},{a:"a1",b:"b1"}];
    this.test_no++; if(this.test_no%2==0) data = [];
    this.pubsub.pub(this.topicprefix+".datas",data);
  }
}
