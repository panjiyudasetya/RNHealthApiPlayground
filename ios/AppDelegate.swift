//
//  AppDelegate.swift
//  HealthApiPlayground
//
//  Created by Panji Y. Wiwaha on 16/04/19.
//  Copyright © 2019 Facebook. All rights reserved.
//

import Foundation
import UIKit

enum JSBundle {
  case prebuild
  case localServer
}

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, RCTBridgeDelegate {
  var window: UIWindow?
  
  #if targetEnvironment(simulator)
  let jsBundleType: JSBundle = .localServer
  #else
  let jsBundleType: JSBundle = .prebuild
  #endif
  
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
    // Override point for customization after application launch.
    
    let bridge = RCTBridge(delegate: self, launchOptions: launchOptions)
    let rootView = RCTRootView(bridge: bridge, moduleName: "HealthApiPlayground", initialProperties: nil)
    rootView?.backgroundColor = UIColor.init(red: 1.0, green: 1.0, blue: 1.0, alpha: 1)
    
    self.window = UIWindow(frame: UIScreen.main.bounds)
    
    let rootViewController = UIViewController()
    rootViewController.view = rootView
    
    self.window!.rootViewController = rootViewController;
    self.window!.makeKeyAndVisible()
    
    return true
  }
  
  func sourceURL(for bridge: RCTBridge!) -> URL! {
    switch(jsBundleType){
    case .prebuild:
      return Bundle.main.url(forResource: "main", withExtension: "jsbundle")!
    case .localServer:
      return RCTBundleURLProvider.init().jsBundleURL(forBundleRoot: "index", fallbackResource: nil)
    }
  }
}
