import numeral from 'numeral'
import './Stats.css'

const backgroundColor = {
    'total-cases': 'rgba(116, 6, 6, 0.4)',
    'active-cases': 'rgba(255, 4, 4, 0.4)',
    'recovered': 'rgba(43, 255, 0, 0.4)',
    'deaths': 'rgba(0, 0, 0, 0.4)'
}

const Stats = ({color, text, currentData, totalData }) => {
    const prettyPrintStat = (stat) => stat ? `${stat > 0? '+': ''}${numeral(stat).format("0.0a")}` : "0";

    return (
        <div className='stats' style={{backgroundColor: backgroundColor[color]}}>
            <h3 className="stats-title"> {text} </h3>
            <h1 className="stats-present">{prettyPrintStat(currentData)}</h1>
            {totalData >= -1 ? <h3 className="stats-total">{prettyPrintStat(totalData)} Total</h3> : ''}
        </div>
    )
}

export default Stats
