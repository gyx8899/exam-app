import React, { Fragment } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import Counter from '../../containers/home/counter';

const Home = () => (
  <Fragment>
    <h1>Hello Next.js</h1>
    <Link prefetch href='/user/userList'>
      <Button type='primary'>UserList Page</Button>
    </Link>
		<div style={{marginTop: '20px'}}>
			Redux Counter Demo:
			<Counter/>
			<Button type="primary" icon="cloud" />
		</div>
  </Fragment>
);
export default Home;
