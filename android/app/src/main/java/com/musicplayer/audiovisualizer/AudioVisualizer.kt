package com.musicplayer.audiovisualizer

import android.media.MediaPlayer
import android.util.Log
import com.chibde.visualizer.SquareBarVisualizer
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp


class AudioVisualizer: SimpleViewManager<SquareBarVisualizer>() {
    private var mContext: ThemedReactContext? = null
    private var mediaPlayer: MediaPlayer? = null
    companion object {
        const val REACT_CLASS = "AudioVisualizer"
    }

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(reactContext: ThemedReactContext): SquareBarVisualizer {
        mContext = reactContext
        return SquareBarVisualizer(reactContext)
    }

    @ReactProp(name="play")
    public fun playVisualizer(visualizer: SquareBarVisualizer, play: Boolean?) {
        if(play != null && mediaPlayer != null) {
            if(play && !mediaPlayer!!.isPlaying) {
                mediaPlayer!!.start()
                return
            }

            if(!play && mediaPlayer!!.isPlaying) {
                mediaPlayer!!.pause()
                return
            }

        }
    }

    @ReactProp(name="src")
    public fun setUri(visualizer: SquareBarVisualizer, src: String) {
        if (mediaPlayer == null) {
            mediaPlayer = MediaPlayer()
            mediaPlayer!!.setDataSource(src)
            mediaPlayer!!.prepare()
        } else {
            mediaPlayer!!.reset()
            mediaPlayer!!.setDataSource(src)
            mediaPlayer!!.prepare()
        }

        mediaPlayer!!.start()
        visualizer.setPlayer(mediaPlayer!!.audioSessionId)
    }

    @ReactProp(name="density", defaultInt= 65)
    public fun setDensity(visualizer: SquareBarVisualizer, density: Int) {
            // most of the time, value that is passed will be int
        Log.i("visualizer", "density: $density")
            visualizer.setDensity(density.toFloat());
    }

    @ReactProp(name="gap", defaultInt = 2)
    public fun setGap(visualizer: SquareBarVisualizer, gap: Int) {
        Log.i("visualizer", "gap: $gap")
            visualizer.setGap(gap);
    }
}