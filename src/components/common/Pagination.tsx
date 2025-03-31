export default function Pagination() {
    return (
        <div className="row">
            <div className="col-lg-12">
              <div className="pagination mt-30">
                <a href="#">
                  <i className="bx bx-chevron-left" />
                </a>
                <a href="#" className="active">
                  1
                </a>
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">
                  <i className="bx bx-chevron-right" />
                </a>
              </div>
            </div>
          </div>
    );
}