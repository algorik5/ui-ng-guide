import { Component, OnInit } from '@angular/core';
import { NzCodeEditorService } from 'ng-zorro-antd/code-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent implements OnInit {

  constructor(private nzCodeEditorService: NzCodeEditorService) { }

  ngOnInit() {
  }

  typescript_text = "let i=0; \nconsole.log(i);"
  markdown_text = "# hi \n- hihi"

  dark = true;
  changeTheme()
  {
    this.nzCodeEditorService.updateDefaultOption({ theme: this.dark ? 'vs-dark' : 'vs' });
  }
}
