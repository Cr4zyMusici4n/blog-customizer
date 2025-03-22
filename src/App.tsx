import clsx from 'clsx';
import { CSSProperties, useState } from 'react';

import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import { ArticleParamsForm } from './components/article-params-form';
import { Article } from './components/article';

import styles from './styles/index.module.scss';

export const App = () => {
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const handleReset = () => {
		setArticleSettings(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleSettings.fontFamilyOption.value,
					'--font-size': articleSettings.fontSizeOption.value,
					'--font-color': articleSettings.fontColor.value,
					'--container-width': articleSettings.contentWidth.value,
					'--bg-color': articleSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleSettings={articleSettings}
				onSubmit={setArticleSettings}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
