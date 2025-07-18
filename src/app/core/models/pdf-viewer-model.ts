import {PdfType} from '../../shared/enums/pdf-type.enum';

export interface PdfViewerData {
  type: PdfType;
  key?: string;
  url?: string;
}
