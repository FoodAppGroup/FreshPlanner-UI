import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

export class TableData<Type> {
  data: Type[] = [];
  readonly displayedColumns: string[] = [];
  readonly dataSource = new MatTableDataSource<Type>();
  readonly pageSizeOptions = [5, 10, 25, 100];
  readonly defaultPageSize = 25;

  constructor(displayedColumns: string[]) {
    this.displayedColumns = displayedColumns;
    this.dataSource.data = this.data;
  }

  public afterViewInit(paginator: MatPaginator | undefined, sort: MatSort | undefined) {
    if (paginator) {
      this.dataSource.paginator = paginator;
    }
    if (sort) {
      this.dataSource.sort = sort;
    }
  }

  public setData(data: Type[]) {
    this.data = data;
    this.dataSource.data = this.data;
  }
}
