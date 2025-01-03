export default function SectionHeader({topText, mainText}: { topText: string, mainText: string}) {
    return (
        <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="section-head pb-45">
            <h5>{topText}</h5>
            <h2>{mainText}</h2>
          </div>
        </div>
      </div>
    );
}