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
import { useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Separator } from 'src/ui/separator';
import { Button } from 'src/ui/button';
import { ArrowButton } from 'src/ui/arrow-button';
import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

type FormProps = {
	changeSettings: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ changeSettings }: FormProps) => {
	const [setting, setSetting] = useState<ArticleStateType>(defaultArticleState);
	const [menuOpen, setMenuOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	const handleChange =
		(option: keyof ArticleStateType) => (value: OptionType) => {
			setSetting((setting) => ({
				...setting,
				[option]: value,
			}));
		};

	const handleReset = () => {
		setSetting(defaultArticleState);
		changeSettings(defaultArticleState);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		changeSettings(setting);
	};

	useOutsideClickClose({
		isOpen: menuOpen,
		rootRef: formRef,
		onChange: setMenuOpen,
	});

	return (
		<div ref={formRef}>
			<ArrowButton
				onClick={() => {
					setMenuOpen(!menuOpen);
				}}
				isMenuOpen={menuOpen}
			/>
			<aside
				className={clsx(styles.container, menuOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' weight={800} size={31} align='left' uppercase>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={setting.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={setting.fontSizeOption}
						onChange={handleChange('fontSizeOption')}
						title='размер шрифта'
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={setting.fontColor}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={setting.backgroundColor}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={setting.contentWidth}
						onChange={handleChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
