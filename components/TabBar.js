import React from 'react';
import PropTypes from 'prop-types';
import './TabBar.scss';

function TabBar ({items, activeLeft}) {
	return (
			<div className="tab-bar">
				<div className="tab-dot" style={{left: activeLeft}}/>
				{items.map((item, index) => (
						<div key={index}>
							<div className={`tab-icon ${item.index === activeItem ? 'active ' + direction : ''}`}>
								<div className="tab-img-active">
									<img src={item.activeImgSrc} alt={item.title}/>
								</div>
								<div className="tab-img-default">
									<img src={item.imgSrc} alt={item.title}/>
								</div>
							</div>
							<div className="tab-text">
								<div className={`tab-title ${item.index !== activeItem ? 'show' : 'hide'}`}>{item.title}</div>
							</div>
						</div>
				))}
			</div>
	);
}

TabBar.propTypes = {

};

const initData = {
	activeItem: 0,
	direction: 'right',
	items: [
		{
			index: 0,
			title: 'Home',
			imgSrc: home,
			activeImgSrc: activeHome
		},
		{
			index: 1,
			title: 'Camera',
			imgSrc: camera,
			activeImgSrc: activeCamera
		},
		{
			index: 2,
			title: 'Files',
			imgSrc: file,
			activeImgSrc: activeFile
		},
		{
			index: 3,
			title: 'Profile',
			imgSrc: mine,
			activeImgSrc: activeMine
		}
	]
};

export default TabBar