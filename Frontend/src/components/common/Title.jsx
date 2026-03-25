import React, { useEffect, useMemo } from 'react'

const ALIGN_CLASS = {
    left: 'text-left',
    center: 'text-center',
}

const SIZE = {
    sm: {
        title: 'text-xl md:text-2xl',
        subtitle: 'text-sm',
        overline: 'text-[10px]',
    },
    md: {
        title: 'text-2xl md:text-3xl',
        subtitle: 'text-sm md:text-base',
        overline: 'text-[10px]',
    },
    lg: {
        title: 'text-3xl md:text-5xl',
        subtitle: 'text-sm md:text-base',
        overline: 'text-xs',
    },
}

const TONE = {
    dark: {
        title: 'text-carbon-black-900',
        subtitle: 'text-carbon-black-600',
        overline: 'text-brown-bark-700',
    },
    light: {
        title: 'text-carbon-black-50',
        subtitle: 'text-carbon-black-50/70',
        overline: 'text-golden-earth-400',
    },
}

const Title = ({
    title,
    subtitle,
    overline,
    align = 'left',
    size = 'md',
    tone = 'dark',
    as = 'h1',
    className = '',
    titleClassName = '',
    subtitleClassName = '',
    overlineClassName = '',
    documentTitle,
}) => {
    const sizes = SIZE[size] || SIZE.md
    const tones = TONE[tone] || TONE.dark
    const titleWeight = size === 'lg' ? 'font-semibold' : 'font-bold'
    const subtitleLayout = align === 'center' ? 'mx-auto max-w-2xl' : ''

    const resolvedDocumentTitle = useMemo(() => {
        if (typeof documentTitle === 'string') return documentTitle
        if (documentTitle === null) return null
        if (typeof title === 'string') return title
        return null
    }, [documentTitle, title])

    useEffect(() => {
        if (!resolvedDocumentTitle) return
        document.title = resolvedDocumentTitle
    }, [resolvedDocumentTitle])

    const HeadingTag = as

    return (
        <header className={`${ALIGN_CLASS[align] || ALIGN_CLASS.left} ${className}`.trim()}>
            {overline ? (
                <p
                    className={`${sizes.overline} font-bold tracking-[0.18em] uppercase mb-1.5 ${tones.overline} ${overlineClassName}`.trim()}
                >
                    {overline}
                </p>
            ) : null}

            <HeadingTag
                className={`${sizes.title} ${titleWeight} tracking-tight leading-tight ${tones.title} ${titleClassName}`.trim()}
            >
                {title}
            </HeadingTag>

            {subtitle ? (
                <p className={`mt-1.5 ${sizes.subtitle} ${subtitleLayout} ${tones.subtitle} ${subtitleClassName}`.trim()}>
                    {subtitle}
                </p>
            ) : null}
        </header>
    )
}

export default Title
