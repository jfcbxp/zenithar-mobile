import RNSwipeButton from 'rn-swipe-button'

interface Properties {
    title: string
    onSwipeSuccess?: (() => void) | undefined
}

export function SwipeButton(properties: Properties) {
    return (
        <RNSwipeButton
            title={properties.title}
            width={'100%'}
            onSwipeSuccess={properties.onSwipeSuccess}
            titleColor='white'
            titleStyles={{ fontWeight: 'bold' }}
            railBackgroundColor='#1F2D5A'
            railFillBackgroundColor='rgba(0, 0, 0, 0.25)'
            railFillBorderColor='transparent'
            railStyles={{ margin: 8 }}
            shouldResetAfterSuccess={true}
            resetAfterSuccessAnimDelay={0}
            thumbIconBackgroundColor='#163E60'
            thumbIconBorderColor='transparent'
            thumbIconImageSource={require('../../../assets/arrow-right.png')} />
    )
}