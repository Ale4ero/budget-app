import React from 'react'
import { Container } from 'react-bootstrap'
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
        <div className="flexBreak"></div>
        <p className='pageText'>Here are some common tax files for your convenience.</p>
            <Container className='fileContainer'>
              <div className='fileBox'>
                <div className='fileTitle'>1040</div>
                <div className='fileText'>Income Form</div>
                <a className="fileBtn" href='https://www.irs.gov/pub/irs-pdf/f1040.pdf' target="_blank" rel="noreferrer">{pdfIcon} Form</a>
              </div>
              <div className='fileBox'>
                <div className='fileTitle'>W-2</div>
                <div className='fileText'>Employer Form</div>
                <a className="fileBtn" href='https://www.irs.gov/pub/irs-pdf/fw2.pdf' target="_blank" rel="noreferrer">{pdfIcon} Form</a>
              </div>
              <div className='fileBox'>
                <div className='fileTitle'>1098-T</div>
                <div className='fileText'>Tuition Form</div>
                <a className="fileBtn" href='https://www.irs.gov/pub/irs-pdf/f1098t.pdf' target="_blank" rel="noreferrer">{pdfIcon} Form</a>
              </div>                
            </Container>
        </div>
      </div>
    </div>
  )
}
