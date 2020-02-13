/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2019 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

import {AppStore, getUserProfile} from '@alfresco/aca-shared/store';
import {ProfileState} from '@alfresco/adf-extensions';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppExtensionService} from '../../extensions/extension.service';
import {ContentManagementService} from '../../services/content-management.service';
import {PageComponent} from '../page.component';
import {AlfrescoApiService, AppConfigService} from '@alfresco/adf-core';
import {DocumentDetails} from './docs.details';

declare var DocsAPI: any;

@Component({
  templateUrl: './onlyoffice.component.html',
  styleUrls: ['./onlyoffice.component.css']
})
export class OnlyofficeComponent extends PageComponent implements OnInit {
  isSmallScreen = false;
  user$: Observable<ProfileState>;
  new: string;
  ecmHost: string;
  columns: any[] = [];
  userDetails: DocumentDetails;
  onlyofficeUrl: string;
  docTitle: string;
  config: string;
  AlfrescoApiService: string;

  constructor(
    content: ContentManagementService,
    extensions: AppExtensionService,
    store: Store<AppStore>,
    private breakpointObserver: BreakpointObserver,
    private location: Location,
    private appConfig: AppConfigService,
    private apiService: AlfrescoApiService
  ) {
    super(store, extensions, content);
    this.user$ = this.store.select(getUserProfile);
    this.ecmHost = this.appConfig.get<string>('ecmHost');
    this.onlyofficeUrl = localStorage.getItem('onlyofficeUrl');
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
        .subscribe(result => {
          this.isSmallScreen = result.matches;
        })
    );

    this.columns = this.extensions.documentListPresets.trashcan || [];
    this.loadScript(this.onlyofficeUrl + 'OfficeWeb/apps/api/documents/api.js');
    this.location.path();
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  public key(k) {
    const result =
      k.replace(new RegExp('[^0-9-.a-zA-Z_=]', 'g'), '_') +
      new Date().getTime();
    return result.substring(result.length - Math.min(result.length, 20));
  }

  public getDocumentType = function(ext) {
    if (
      '.doc.docx.docm.dot.dotx.dotm.odt.fodt.ott.rtf.txt.html.htm.mht.pdf.djvu.fb2.epub.xps'.indexOf(
        ext
      ) !== -1
    )
      return 'text';
    if ('.xls.xlsx.xlsm.xlt.xltx.xltm.ods.fods.ots.csv'.indexOf(ext) !== -1)
      return 'spreadsheet';
    if (
      '.pps.ppsx.ppsm.ppt.pptx.pptm.pot.potx.potm.odp.fodp.otp'.indexOf(ext) !==
      -1
    )
      return 'presentation';
    return null;
  };

  public close() {//back button events and document unlock
    const nodesId = localStorage.getItem('NodeId');
    this.apiService
      .getInstance()
      .webScript.executeWebScript(
        'POST',
        '/unlock',
        null,
        null,
        'api/-default-/public/alfresco/versions/1/nodes/' + nodesId + '/unlock',
        JSON.stringify('')
      )
      .then((response: any) => {});
    this.location.back();
  }

  public call() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.docTitle = localStorage.getItem('docTitle');
    DocsAPI.DocEditor('placeholder', this.userDetails);
  }
}
