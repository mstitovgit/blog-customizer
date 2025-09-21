import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useRef, useEffect } from 'react';

type ArticleProps = {
	initialValues: ArticleStateType;
	onUpdate: (styles: Partial<ArticleStateType>) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	initialValues,
	onUpdate,
	onReset,
}: ArticleProps) => {
	const sidebarRef = useRef<HTMLDivElement>(null);
	const arrowRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(initialValues);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target as Node) &&
				arrowRef.current &&
				!arrowRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onUpdate(formState);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(initialValues);
		onReset();
	};

	return (
		<>
			<ArrowButton
				ref={arrowRef}
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((prevIsOpen) => !prevIsOpen);
				}}
			/>
			<aside
				ref={sidebarRef}
				className={
					isOpen
						? `${styles.container} ${styles.container_open}`
						: styles.container
				}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(opt) =>
							setFormState((prev) => ({ ...prev, fontFamilyOption: opt }))
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						name={'fontSize'}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(opt) =>
							setFormState((prev) => ({ ...prev, fontSizeOption: opt }))
						}
					/>
					<Separator />
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(opt) =>
							setFormState((prev) => ({ ...prev, fontColor: opt }))
						}></Select>
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(opt) =>
							setFormState((prev) => ({ ...prev, backgroundColor: opt }))
						}></Select>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(opt) =>
							setFormState((prev) => ({ ...prev, contentWidth: opt }))
						}></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
