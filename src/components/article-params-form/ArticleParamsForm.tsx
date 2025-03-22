import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { useState, useRef, useEffect, FormEvent } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type Props = {
	articleSettings: ArticleStateType;
	onSubmit: (articleSettings: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	articleSettings,
	onSubmit,
	onReset,
}: Props) => {
	const [isOpen, setIsOpen] = useState(true);
	const [localArticleSettings, setLocalArticleSettings] =
		useState(articleSettings);
	const modalRef = useRef<HTMLElement | null>(null);

	const toggleModal = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			setIsOpen(false);
		}
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	const handleFontFamily = (newFontFamily: OptionType) => {
		setLocalArticleSettings((prev) => ({
			...prev,
			fontFamilyOption: newFontFamily,
		}));
	};

	const handleFontSize = (newFontSize: OptionType) => {
		setLocalArticleSettings((prev) => ({
			...prev,
			fontSizeOption: newFontSize,
		}));
	};

	const handleFontColor = (newFontColor: OptionType) => {
		setLocalArticleSettings((prev) => ({
			...prev,
			fontColor: newFontColor,
		}));
	};

	const handleBackgroundColor = (newBackgroundColor: OptionType) => {
		setLocalArticleSettings((prev) => ({
			...prev,
			backgroundColor: newBackgroundColor,
		}));
	};

	const handleContentWidth = (newContentWidth: OptionType) => {
		setLocalArticleSettings((prev) => ({
			...prev,
			contentWidth: newContentWidth,
		}));
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit(localArticleSettings);
	};

	const handleReset = () => {
		onReset();
		setLocalArticleSettings(defaultArticleState);
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleModal} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={modalRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.content}>
						<Text as='h1' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							selected={localArticleSettings.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleFontFamily}
							title='Шрифты'
						/>
						<RadioGroup
							name='Размер шрифта'
							options={fontSizeOptions}
							selected={localArticleSettings.fontSizeOption}
							onChange={handleFontSize}
							title='Размер шрифта'
						/>
						<Select
							selected={localArticleSettings.fontColor}
							options={fontColors}
							onChange={handleFontColor}
							title='Цвет шрифта'
						/>
						<Separator />
						<Select
							selected={localArticleSettings.backgroundColor}
							options={backgroundColors}
							onChange={handleBackgroundColor}
							title='Цвет фона'
						/>
						<Select
							selected={localArticleSettings.contentWidth}
							options={contentWidthArr}
							onChange={handleContentWidth}
							title='Ширина контента'
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
