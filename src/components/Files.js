import React from 'react'
import { Button, Container } from 'react-bootstrap'
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons'


const pdfIcon = <FontAwesomeIcon icon={faFilePdf} />

export default function Files() {
  return (
    <div>
      <div className="background">
        <div className="pageContent">
        <h1 className="pageTitle fw-bold">Files</h1>
            <Container className='fileContainer'>
              <div className='fileBox'>
                {/* <div>{pdfIcon}</div> */}
                <div className='fileTitle fw-bold display-4 position-absolute '>1040</div>
                <div className='fileText'>Form</div>
                <a className="fileBtn" href='https://www.irs.gov/pub/irs-pdf/f1040.pdf' target="_blank">{pdfIcon} Download</a>
              </div>
              <div className='fileBox'>
                <div className='fileTitle fw-bold display-4 position-absolute '>W-2</div>
                <div className='fileText'>Form</div>
                <a className="fileBtn" href='https://www.irs.gov/pub/irs-pdf/fw2.pdf' target="_blank">{pdfIcon} Download</a>
              </div>
              <div className='fileBox'>
                <div className='fileTitle fw-bold display-4 position-absolute '>1098-T</div>
                <div className='fileText'>Form</div>
                <a className="fileBtn" href='https://www.irs.gov/pub/irs-pdf/f1098t.pdf' target="_blank">{pdfIcon} Download</a>
              </div>                
            </Container>
        </div>
      </div>
    </div>
  )
}
