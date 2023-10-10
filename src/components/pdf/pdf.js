import React from "react";
import { Document, Page } from "@react-pdf/renderer";
class pdf extends React.Component {
  render() {
    return (
      <Document>
        <Page size="A4">
          <table className="table">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
                <td>
                  <img src="https://i.pravatar.cc/50?img=1" alt="thumb" />
                </td>
              </tr>
              <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@example.com</td>
                <td>
                  <img src="https://i.pravatar.cc/50?img=2" alt="thumb" />
                </td>
              </tr>
              <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@example.com</td>
                <td>
                  <img src="https://i.pravatar.cc/50?img=3" alt="thumb" />
                </td>
              </tr>
            </tbody>
          </table>
        </Page>
      </Document>
    );
  }
}

export default pdf;
