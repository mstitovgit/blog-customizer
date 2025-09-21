import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type StyleProps = {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	containerWidth: string;
	bgColor: string;
};

const App = () => {
	const [styleState, setStyleState] =
		useState<ArticleStateType>(defaultArticleState);

	const updateStyles = (updates: Partial<ArticleStateType>) => {
		setStyleState((prev) => ({ ...prev, ...updates }));
	};

	const resetStyles = () => {
		setStyleState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': styleState.fontFamilyOption.value,
					'--font-size': styleState.fontSizeOption.value,
					'--font-color': styleState.fontColor.value,
					'--container-width': styleState.contentWidth.value,
					'--bg-color': styleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialValues={defaultArticleState}
				onUpdate={updateStyles}
				onReset={resetStyles}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
