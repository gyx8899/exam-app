import Link from 'next/link'
import NextError from 'next/error'
import React from 'react'

export default class Error extends React.Component {
  static getInitialProps (ctx) {
    const { statusCode } = NextError.getInitialProps(ctx)
    return { statusCode: statusCode || null }
  }

  render () {
    return (
      <div style={{textAlign: 'center'}}>
        <h2 id='errorStatusCode'>{this.props.statusCode || 'unknown'}</h2>
        <p>
          <Link href='/'>
            <a id='errorGoHome'>回到首页</a>
          </Link>
        </p>
      </div>
    )
  }
}