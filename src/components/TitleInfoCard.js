import React from 'react'
import { currencyFormatter } from "../utils";

export default function TitleInfoCard({mainInfo, description, icon}) {
  return (
    <div className="titleInfo">
                <div className="titleInfoBody">
                        <div className="titleMainInfo">{currencyFormatter.format(mainInfo)}</div>
                        <div className="titleFooter">{description}</div>
                </div>
                <div className="titleInfoIcon">{icon}</div>
    </div>
  )
}
