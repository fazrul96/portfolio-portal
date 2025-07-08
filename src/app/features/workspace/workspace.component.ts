import {Component, OnInit} from '@angular/core';
import {NgClass, NgStyle, TitleCasePipe} from '@angular/common';
import {DEVOPS_TOOLS, Tool} from '../../shared/data/project.data';
import {FormsModule} from '@angular/forms';
import {
  DefaultFlexDirective,
  DefaultLayoutAlignDirective,
  DefaultLayoutDirective,
  DefaultLayoutGapDirective
} from 'ng-flex-layout';

@Component({
  selector: 'app-workspace',
  imports: [
    NgClass,
    NgStyle,
    FormsModule,
    TitleCasePipe,
    DefaultFlexDirective,
    DefaultLayoutAlignDirective,
    DefaultLayoutDirective,
    DefaultLayoutGapDirective
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent implements OnInit {
  tools: Tool[] = DEVOPS_TOOLS;
  userRole: 'admin' | 'user' = 'admin';
  viewMode: 'grid' | 'list' = 'grid';
  selectedCategory: string = '';
  categories: string[] = [];
  // constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.userRole = this.authService.getUserRole();
    this.categories = Array.from(
      new Set(this.tools.map(t => t.category)))
      .sort((a, b) => a.localeCompare(b));
  }

  get filteredTools(): Tool[] {
    return this.tools
      .filter(tool =>
        this.selectedCategory ? tool.category === this.selectedCategory : true
      )
      .filter(tool =>
        this.userRole === 'admin' ? true : !tool.sensitive
      );
      // .filter(tool =>
      //   tool.accessRoles ? tool.accessRoles.includes(this.userRole) : true
      // );
  }

  getRiskBadgeClass(risk: string): string {
    return {
      low: 'risk-low',
      medium: 'risk-medium',
      high: 'risk-high',
    }[risk] ?? '';
  }
}
