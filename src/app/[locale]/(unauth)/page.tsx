import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

export async function generateMetadata(props: { params: { locale: string } }) {
    const t = await getTranslations({
        locale: props.params.locale,
        namespace: 'Index',
    })

    return {
        title: t('meta_title'),
        description: t('meta_description'),
    }
}

export default function Index(props: { params: { locale: string } }) {
    unstable_setRequestLocale(props.params.locale)

    return (
        <>
            <p>Hello world</p>
            <div className="min-h-96">5</div>
            <div className="min-h-96">4</div>
            <div className="min-h-96">3</div>
            <div className="min-h-96">2</div>
            <div className="min-h-96">alo</div>
        </>
    )
}
