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

  ngOnInit() {
    this.pubsub.sub("myeditor.data",data=>{
      this.logging.debug("=== myeditor.data="+JSON.stringify(data))
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
  test_data()
  {
    let data = [{a:"a1",b:"b1"},{a:"a1",b:"b1"}];
    this.pubsub.pub("myeditor.data",data);
  }
}
