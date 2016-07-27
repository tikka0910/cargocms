import React from 'react'

import _ from 'lodash'

import SubHeader from '../layout/SubHeader.jsx'
import BigBreadcrumbs from '../../../components/layout/navigation/components/BigBreadcrumbs.jsx'
import WidgetGrid from '../../../components/layout/widgets/WidgetGrid.jsx'
import JarvisWidget from '../../../components/layout/widgets/JarvisWidget.jsx'

import Datatable from '../../../components/tables/Datatable.jsx'


let Datatables = React.createClass({
    render: function () {
      let tableConfig = {
        ajax: '/user',
        columns: [
          {data: "id"},
          {data: "email"},
          {data: "username"},
          {data: "firstName"},
          {data: "lastName"}
        ],
        select: {
            style: 'single'
        },
        buttons: [
          {
            text: 'edit',
            action: function ( e, dt, node, config ) {
                alert("edit");
            }
          },
          {
            text: 'create',
            action: function ( e, dt, node, config ) {
                alert("create");
            }
          },
          {
            text: 'delete',
            action: function ( e, dt, node, config ) {
                alert("delete");
            }
          }
        ]
      }
        return (
            <div id="content">
                <div className="row">
                    <BigBreadcrumbs items={['User', 'list']} icon="table"
                                    className="col-xs-12 col-sm-7 col-md-7 col-lg-4"/>
                    <SubHeader />
                </div>

                <WidgetGrid>
                    <div className="row">
                        <article className="col-sm-12">
                            <JarvisWidget editbutton={false} deletebutton={false} color="darken">
                                <header>
                                  <span className="widget-icon"> <i className="fa fa-table"/> </span>
                                  <h2>Users</h2>
                                </header>
                                <div>
                                    <div className="widget-body no-padding">
                                      <Datatable
                                        options={tableConfig}
                                        paginationLength={true} className="table table-striped table-bordered table-hover"
                                        width="100%">
                                        <thead>
                                        <tr>
                                            <th data-hide="ID">ID</th>
                                            <th data-hide="email">email</th>
                                            <th data-hide="username">username</th>
                                            <th data-hide="firstName">firstName</th>
                                            <th data-hide="lastName">lastName</th>
                                        </tr>
                                        </thead>
                                    </Datatable>
                                  </div>
                                </div>
                            </JarvisWidget>
                        </article>


                    </div>

                </WidgetGrid>
            </div>
        )
    }
});

export default Datatables
